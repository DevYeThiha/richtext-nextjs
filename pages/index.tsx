import type { NextPage } from 'next'
import RichTextEditor from '../components/Editor';


const Home: NextPage = () => {

  return (
    <div className="App">
      <RichTextEditor />
    </div>
  )
}

export default Home
