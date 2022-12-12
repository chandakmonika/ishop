import React, {useRef} from 'react'
import JoditEditor from 'jodit-react'
const Product_Editor = ({setValue, config, value})=> {
const editor = useRef(null);
  return (
    <div>
        
<JoditEditor ref={editor} onChange={(content)=>setValue(content)} config={config} value={value}></JoditEditor>
    </div>
  )
}

export default Product_Editor;
