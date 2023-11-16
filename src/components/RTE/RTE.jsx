import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
function RTE({
    name,
    control,
    label,
    className="",
    defaultValue = ""
}) {
    return (
        <div className={className}>
            {label && <label>{label}</label>}
            <Controller
                name={name || "content"}
                control={control}
                rules={{ required: 'This field is required' }} 
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue={defaultValue}
                        apiKey='cxrj2jrg2cbezwugkaafhajkdizzxd45vh15gwrlshoba1sv'
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "charmap",
                                "image",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "paste",
                                "wordcount",
                                "help"
                            ],
                            toolbar:
                                "undo redo | formatselect | bold italic backcolor forecolor removeformat | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | link image media table | help",
                            content_style: "body { font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px}"
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

export default RTE