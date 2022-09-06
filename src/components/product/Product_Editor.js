import React, {useRef} from 'react'
import JoditEditor from 'jodit-react'
const Product_Editor = ({setValue, config})=> {
const editor = useRef(null);
  return (
    <div>
        
<JoditEditor ref={editor} onChange={(content)=>setValue(content)} config={config}></JoditEditor>
    </div>
  )
}

export default Product_Editor;
