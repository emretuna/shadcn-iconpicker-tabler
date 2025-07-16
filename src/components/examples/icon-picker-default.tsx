import { IconPicker } from "../../../registry/ui/icon-picker";
import { PreviewCode } from "../preview-code";

export function IconPickerExample() {
  return <IconPicker defaultValue="brand-github" />;
}

export function IconPickerDefault() {
  const code = `"use client";
import { IconPicker } from "@/components/ui/icon-picker";

export function IconPickerExample() {
    return <IconPicker defaultValue="brand-github" />;
}`;

  return (
    <PreviewCode code={code} preview={<IconPickerExample />} language="tsx" />
  );
}
