import React from 'react'
import marked from 'marked'
import contact from './contact.md'
import resources from './resources.md'
import faq from './faq.md'
import './style.less'

let renderer = new marked.Renderer();
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
})
const mdMap = {
    Contact: contact,
    Resources: resources,
    FAQ: faq,
}

class MdPage extends React.Component{
    constructor(props){
        super(props)
        let mdname = this.props.location ? this.props.location.pathname.slice(1) : 'FAQ'
        this.state = {
            content: mdMap[mdname]
        }
    }
    shouldComponentUpdate(nextProps){
        return nextProps.location.pathname !== this.props.location.pathname
    }
    componentWillReceiveProps(nextProps){
        let mdname = nextProps.location.pathname.slice(1)
        this.setState({
            content: mdMap[mdname]
        })
    }
    render(){
        return (
            <div className="markdown-body" dangerouslySetInnerHTML={{__html: marked(this.state.content,{
                renderer: renderer
            })}}></div>
        )
    }
}
export default MdPage