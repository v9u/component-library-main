
import HugeTree from './src/hugeTree/index.js';
import HugeList from './src/hugeList/index.js';

const components = [HugeTree, HugeList];
const obj = {
  install:(Vue)=>{
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
}




export default obj
