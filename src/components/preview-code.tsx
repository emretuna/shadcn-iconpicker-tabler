"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { IconCheck, IconCopy } from "@tabler/icons-react"
import { CodeBlock } from "./code-block"
import type { Language } from "prism-react-renderer"
import { OpenInV0Button } from "./open-in-v0"

interface PreviewCodeProps {
  preview: React.ReactNode
  code: string
  language: Language
  v0Url?: string
}

const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="outline" size="icon" onClick={copyToClipboard}>
      {copied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
    </Button>
  )
}

export function PreviewCode({ preview, code, language, v0Url }: PreviewCodeProps) {
  return (
    <Tabs defaultValue="preview" className="w-full">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          {v0Url && <OpenInV0Button url={v0Url} />}
          <CopyButton code={code} />
        </div>
      </div>
      <TabsContent value="preview" className="p-4 border rounded-md mt-2 min-h-[300px] data-[state=active]:flex items-center justify-center">
        {preview}
      </TabsContent>
      <TabsContent value="code" className="mt-2">
        <CodeBlock code={code} language={language} />
      </TabsContent>
    </Tabs>
  )
}

