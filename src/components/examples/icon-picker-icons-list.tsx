import { IconData, IconPicker } from "../../../registry/ui/icon-picker";
import { PreviewCode } from "../preview-code";

export function IconPickerExample() {
    const icons: IconData[] = [
        {
            name: "brand-github",
            componentName: "IconBrandGithub",
            tags: ["git", "social"],
            categories: ["social"]
        },
        {
            name: "brand-twitter",
            componentName: "IconBrandTwitter",
            tags: ["X", "social"],
            categories: ["social"]
        },
        {
            name: "brand-facebook",
            componentName: "IconBrandFacebook",
            tags: ["meta", "fb", "social"],
            categories: ["social"]
        },
        {
            name: "brand-instagram",
            componentName: "IconBrandInstagram",
            tags: ["meta", "ig", "social"],
            categories: ["social"]
        },
        {
            name: "brand-linkedin",
            componentName: "IconBrandLinkedin",
            tags: ["linkedin", "social"],
            categories: ["social"]
        },
        {
            name: "brand-youtube",
            componentName: "IconBrandYoutube",
            tags: ["yt", "social"],
            categories: ["social"]
        }
    ];

  return <IconPicker iconsList={icons} categorized={false} />;
}

export function IconPickerIconsList() {
  const code = `"use client";
import { IconPicker, IconData } from "@/components/ui/icon-picker";

export function IconPickerExample() {
    const icons: IconData[] = [
        {
            name: "brand-github",
            componentName: "IconBrandGithub",
            tags: ["git", "social"],
            categories: ["social"]
        },
        {
            name: "brand-twitter",
            componentName: "IconBrandTwitter",
            tags: ["X", "social"],
            categories: ["social"]
        },
        {
            name: "brand-facebook",
            componentName: "IconBrandFacebook",
            tags: ["meta", "fb", "social"],
            categories: ["social"]
        },
        {
            name: "brand-instagram",
            componentName: "IconBrandInstagram",
            tags: ["meta", "ig", "social"],
            categories: ["social"]
        },
        {
            name: "brand-linkedin",
            componentName: "IconBrandLinkedin",
            tags: ["linkedin", "social"],
            categories: ["social"]
        },
        {
            name: "brand-youtube",
            componentName: "IconBrandYoutube",
            tags: ["yt", "social"],
            categories: ["social"]
        }
    ];

    return <IconPicker iconsList={icons} categorized={false} />;
}`;

  return (
    <PreviewCode code={code} preview={<IconPickerExample />} language="tsx" />
  );
}
