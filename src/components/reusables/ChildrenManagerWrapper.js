import { useParams } from 'react-router-dom';
import ChildrenManager from '../pages/ChildrenManager'


// Wrapper component to inject the parentId from URL params into ChildrenManager
function ChildrenManagerWrapper(props) {
    

  let { id } = useParams();
  return <ChildrenManager id={id} />;
}
export default ChildrenManagerWrapper;