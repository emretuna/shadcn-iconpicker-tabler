"use client";

import * as React from "react";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconProps } from '@tabler/icons-react';
import { lazy, Suspense } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { iconsData } from "./icons-data";
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import { Skeleton } from "@/components/ui/skeleton";
import Fuse from 'fuse.js';
import { useDebounceValue } from "usehooks-ts";

export type IconData = {
  name: string;
  componentName: string;
  categories: string[];
  tags: string[];
};

export type IconName = string;

interface IconPickerProps extends Omit<React.ComponentPropsWithoutRef<typeof PopoverTrigger>, 'onSelect' | 'onOpenChange'> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  searchable?: boolean
  searchPlaceholder?: string
  triggerPlaceholder?: string
  iconsList?: IconData[]
  categorized?: boolean
  modal?: boolean
}

const IconRenderer = React.memo(({ name }: { name: string }) => {
  return <Icon name={name} />;
});
IconRenderer.displayName = "IconRenderer";

const IconsColumnSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Skeleton className="h-4 w-1/2 rounded-md" />
      <div className="grid grid-cols-5 gap-2 w-full">
        {
          Array.from({ length: 40 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-10 rounded-md" />
        ))
      }
      </div>
    </div>
  )
}

const useIconsData = () => {
  const [icons, setIcons] = useState<IconData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadIcons = async () => {
      setIsLoading(true);

      const { iconsData } = await import('./icons-data');
      if (isMounted) {
        setIcons(iconsData);
        setIsLoading(false);
      }
    };

    loadIcons();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return { icons, isLoading };
};

const IconPicker = React.forwardRef<
  React.ComponentRef<typeof PopoverTrigger>,
  IconPickerProps
>(({
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen,
  onOpenChange,
  children,
  searchable = true,
  searchPlaceholder = "Search for an icon...",
  triggerPlaceholder = "Select an icon",
  iconsList,
  categorized = true,
  modal = false,
  ...props
}, ref) => {
  const [selectedIcon, setSelectedIcon] = useState<IconName | undefined>(defaultValue)
  const [isOpen, setIsOpen] = useState(defaultOpen || false)
  const [search, setSearch] = useDebounceValue("", 100);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const { icons } = useIconsData();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedIconsCount, setLoadedIconsCount] = useState(50);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const iconsToUse = useMemo(() => iconsList || icons, [iconsList, icons]);
  
  const fuseInstance = useMemo(() => {
    return new Fuse(iconsToUse, {
      keys: ['name', 'tags', 'categories'],
      threshold: 0.3,
      ignoreLocation: true,
      includeScore: true,
    });
  }, [iconsToUse]);

  const allFilteredIcons = useMemo(() => {
    if (search.trim() === "") {
      return iconsToUse;
    }
    
    const results = fuseInstance.search(search.toLowerCase().trim());
    return results.map(result => result.item);
  }, [search, iconsToUse, fuseInstance]);

  const filteredIcons = useMemo(() => {
    // When searching, show all results (search results are usually fewer)
    if (search.trim() !== "") {
      return allFilteredIcons;
    }
    
    // When not searching, apply pagination
    return allFilteredIcons.slice(0, loadedIconsCount);
  }, [allFilteredIcons, loadedIconsCount, search]);

  const categorizedIcons = useMemo(() => {
    if (!categorized || search.trim() !== "") {
      return [{ name: "All Icons", icons: filteredIcons }];
    }

    const categories = new Map<string, IconData[]>();
    
    filteredIcons.forEach(icon => {
      if (icon.categories && icon.categories.length > 0) {
        icon.categories.forEach(category => {
          if (!categories.has(category)) {
            categories.set(category, []);
          }
          categories.get(category)!.push(icon);
        });
      } else {
        const category = "Other";
        if (!categories.has(category)) {
          categories.set(category, []);
        }
        categories.get(category)!.push(icon);
      }
    });
    
    return Array.from(categories.entries())
      .map(([name, icons]) => ({ name, icons }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredIcons, categorized, search]);

  const virtualItems = useMemo(() => {
    const items: Array<{
      type: 'category' | 'row';
      categoryIndex: number;
      rowIndex?: number;
      icons?: IconData[];
    }> = [];

    categorizedIcons.forEach((category, categoryIndex) => {
      items.push({ type: 'category', categoryIndex });
      
      const rows = [];
      for (let i = 0; i < category.icons.length; i += 5) {
        rows.push(category.icons.slice(i, i + 5));
      }
      
      
      rows.forEach((rowIcons, rowIndex) => {
        items.push({ 
          type: 'row', 
          categoryIndex, 
          rowIndex, 
          icons: rowIcons 
        });
      });
    });
    
    return items;
  }, [categorizedIcons]);

  const categoryIndices = useMemo(() => {
    const indices: Record<string, number> = {};
    
    virtualItems.forEach((item, index) => {
      if (item.type === 'category') {
        indices[categorizedIcons[item.categoryIndex].name] = index;
      }
    });
    
    return indices;
  }, [virtualItems, categorizedIcons]);

  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: virtualItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => virtualItems[index].type === 'category' ? 25 : 40,
    paddingEnd: 2,
    gap: 10,
    overscan: 5,
  });

  const handleValueChange = useCallback((icon: IconName) => {
    if (value === undefined) {
      setSelectedIcon(icon)
    }
    onValueChange?.(icon)
  }, [value, onValueChange]);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setSearch("");
    // Reset pagination when opening/closing
    setLoadedIconsCount(50);
    
    if (open === undefined) {
      setIsOpen(newOpen)
    }
    onOpenChange?.(newOpen)
    
    setIsPopoverVisible(newOpen);
    
    if (newOpen) {
      setTimeout(() => {
        virtualizer.measure();
        setIsLoading(false);
      }, 1);
    }
  }, [open, onOpenChange, virtualizer]);

  const handleIconClick = useCallback((iconName: IconName) => {
    handleValueChange(iconName);
    setIsOpen(false);
    setSearch("");
  }, [handleValueChange]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    
    // Reset pagination when search changes
    if (e.target.value.trim() === "") {
      setLoadedIconsCount(50);
    }
    
    if (parentRef.current) {
      parentRef.current.scrollTop = 0;
    }
    
    virtualizer.scrollToOffset(0);
  }, [virtualizer]);

  const scrollToCategory = useCallback((categoryName: string) => {
    const categoryIndex = categoryIndices[categoryName];
    
    if (categoryIndex !== undefined && virtualizer) {
      virtualizer.scrollToIndex(categoryIndex, { 
        align: 'start',
        behavior: 'smooth'
      });
    }
  }, [categoryIndices, virtualizer]);

  const categoryButtons = useMemo(() => {
    if (!categorized || search.trim() !== "") return null;
    
    return categorizedIcons.map(category => (
      <Button 
        key={category.name}
        variant={"outline"}
        size="sm"
        className="text-xs"
        onClick={(e) => {
          e.stopPropagation();
          scrollToCategory(category.name);
        }}
      >
        {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
      </Button>
    ));
  }, [categorizedIcons, scrollToCategory, categorized, search]);

  const renderIcon = useCallback((icon: IconData) => (
    <TooltipProvider key={icon.name}>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            "p-2 rounded-md border hover:bg-foreground/10 transition",
            "flex items-center justify-center"
          )}
          onClick={() => handleIconClick(icon.name as IconName)}>
          <IconRenderer name={icon.name as IconName} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{icon.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ), [handleIconClick]);

  const loadMoreIcons = useCallback(() => {
    if (search.trim() !== "" || isLoadingMore) return;
    
    const hasMore = loadedIconsCount < allFilteredIcons.length;
    if (hasMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setLoadedIconsCount(prev => Math.min(prev + 50, allFilteredIcons.length));
        setIsLoadingMore(false);
      }, 300);
    }
  }, [search, isLoadingMore, loadedIconsCount, allFilteredIcons.length]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    // Load more when user scrolls to bottom 10% of the content
    if (scrollTop + clientHeight >= scrollHeight * 0.9) {
      loadMoreIcons();
    }
  }, [loadMoreIcons]);

  const renderVirtualContent = useCallback(() => {
    if (filteredIcons.length === 0) {
      return (
        <div className="text-center text-gray-500">
          No icon found
        </div>
      );
    }

    return (
      <div 
        className="relative w-full overscroll-contain"
        style={{ 
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem: VirtualItem) => {
          const item = virtualItems[virtualItem.index];
          
          if (!item) return null;
          
          const itemStyle = {
            position: 'absolute' as const,
            top: 0,
            left: 0,
            width: '100%',
            height: `${virtualItem.size}px`,
            transform: `translateY(${virtualItem.start}px)`,
          };
          
          if (item.type === 'category') {
            return (
              <div
                key={virtualItem.key}
                style={itemStyle}
                className="top-0 bg-background z-10"
              >
                <h3 className="font-medium text-sm capitalize">
                  {categorizedIcons[item.categoryIndex].name}
                </h3>
                <div className="h-[1px] bg-foreground/10 w-full" />
              </div>
            );
          }
          
          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              style={itemStyle}
            >
              <div className="grid grid-cols-5 gap-2 w-full">
                {item.icons!.map(renderIcon)}
              </div>
            </div>
          );
        })}
        {isLoadingMore && (
          <div className="flex justify-center items-center py-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
            <span className="ml-2 text-sm text-gray-600">Loading more icons...</span>
          </div>
        )}
      </div>
    );
  }, [virtualizer, virtualItems, categorizedIcons, filteredIcons, renderIcon, isLoadingMore]);

  React.useEffect(() => {
    if (isPopoverVisible) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        virtualizer.measure();
      }, 10);
      
      const resizeObserver = new ResizeObserver(() => {
        virtualizer.measure();
      });
      
      if (parentRef.current) {
        resizeObserver.observe(parentRef.current);
      }
      
      return () => {
        clearTimeout(timer);
        resizeObserver.disconnect();
      };
    }
  }, [isPopoverVisible, virtualizer]);

  return (
    <Popover open={open ?? isOpen} onOpenChange={handleOpenChange} modal={modal}>
      <PopoverTrigger ref={ref} asChild {...props}>
        {children || (
          <Button variant="outline">
            {(value || selectedIcon) ? (
              <>
                <Icon name={(value || selectedIcon)!} /> {value || selectedIcon}
              </>
            ) : (
              triggerPlaceholder
            )}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        {searchable && (
          <Input
            placeholder={searchPlaceholder}
            onChange={handleSearchChange}
            className="mb-2"
          />
        )}
        {categorized && search.trim() === "" && (
          <div className="flex flex-row gap-1 mt-2 overflow-x-auto pb-2">
            {categoryButtons}
          </div>
        )}
        <div
          ref={parentRef}
          className="max-h-60 overflow-auto"
          style={{ scrollbarWidth: 'thin' }}
          onScroll={handleScroll}
        >
          {isLoading ? (
            <IconsColumnSkeleton />
          ) : (
            renderVirtualContent()
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
});
IconPicker.displayName = "IconPicker";

interface IconComponentProps extends Omit<IconProps, 'ref'> {
  name: string;
}

const Icon = React.forwardRef<
  SVGSVGElement,
  IconComponentProps
>(({ name, ...props }, _ref) => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType<IconProps> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Find the icon data to get the component name
        const iconData = iconsData.find(icon => icon.name === name);
        if (!iconData) {
          throw new Error(`Icon "${name}" not found`);
        }
        
        // Dynamically import the icon component
        const module = await import(`@tabler/icons-react`);
        const IconComponent = (module as any)[iconData.componentName];
        
        if (!IconComponent) {
          throw new Error(`Component "${iconData.componentName}" not found`);
        }
        
        setIconComponent(() => IconComponent);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    loadIcon();
  }, [name]);

  if (isLoading) {
    return (
      <div className="w-6 h-6 animate-pulse bg-gray-200 rounded" aria-label="Loading icon..." />
    );
  }

  if (error || !IconComponent) {
    return (
      <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400" title={error || 'Icon not found'}>
        ?
      </div>
    );
  }

  return <IconComponent {...props} />;
});
Icon.displayName = "Icon";

export { IconPicker, Icon };