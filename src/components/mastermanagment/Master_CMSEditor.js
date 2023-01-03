import React, {useRef} from 'react'

import JoditEditor from 'jodit-react'
 const Master_CMSEditor= ({setValue, config, value})=> {
    const editor = useRef(null);
  return (
    <div>
      <JoditEditor ref={editor} onChange={(content)=>setValue(content)} value={value} config={config}></JoditEditor>

    </div>
  )
}
export default Master_CMSEditor;
