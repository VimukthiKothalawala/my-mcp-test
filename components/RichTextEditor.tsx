'use client'

import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-md animate-pulse"></div>,
})

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (content: string) => void
}) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'script',
    'indent',
    'direction',
    'size',
    'color',
    'background',
    'font',
    'align',
  ]

  return (
    <div className="space-y-2">
      <div className="ql-wrapper rounded-md border border-gray-300 overflow-hidden">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Write your premium looking blog post here..."
        />
      </div>
      <style jsx global>{`
        .ql-wrapper {
          background: white;
        }
        .ql-container {
          font-size: 16px;
          font-family: inherit;
        }
        .ql-editor {
          min-height: 300px;
          padding: 15px;
          color: black;
        }
        .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: italic;
        }
      `}</style>
    </div>
  )
}
