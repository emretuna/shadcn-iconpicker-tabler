import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const props = [
  {
    prop: "value",
    type: "IconName",
    default: "-",
    description: "The controlled value of the selected icon.",
  },
  {
    prop: "defaultValue",
    type: "IconName",
    default: "-",
    description: "The default value of the selected icon.",
  },
  {
    prop: "onValueChange",
    type: "(value: IconName) => void",
    default: "-",
    description: "Callback invoked when an icon is selected.",
  },
  {
    prop: "open",
    type: "boolean",
    default: "-",
    description: "Controlled open state of the picker.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Default open state of the picker.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    default: "-",
    description: "Callback invoked when the open state changes.",
  },
  {
    prop: "children",
    type: "ReactNode",
    default: "-",
    description: "The trigger element to open the icon picker.",
  },
  {
    prop: "searchable",
    type: "boolean",
    default: "true",
    description: "Whether the icon picker is searchable.",
  },
  {
    prop: "searchPlaceholder",
    type: "string",
    default: "Search for an icon...",
    description: "The placeholder for the search input.",
  },
  {
    prop: "triggerPlaceholder",
    type: "string",
    default: "Select an icon",
    description:
      "The text displayed on the default trigger button when no icon is selected.",
  },
  {
    prop: "iconsList",
    type: "IconList",
    default: "all tabler icons",
    description: "The list of icons to display in the picker.",
  },
  {
    prop: "categorized",
    type: "boolean",
    default: "true",
    description:
      "Display icons in categories and add categories buttons to scroll to the desired category.",
  },
  {
    prop: "modal",
    type: "boolean",
    default: "false",
    description: "Whether the icon picker is being rendered in a modal.",
  },
];

export function IconsPickerProps() {
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Prop</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
          <TableHead className="">Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.map((prop) => (
          <TableRow key={prop.prop}>
            <TableCell className="font-medium">
              <span className="text-foreground">{prop.prop}</span>
            </TableCell>
            <TableCell>{prop.type}</TableCell>
            <TableCell>{prop.default}</TableCell>
            <TableCell className="">{prop.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

