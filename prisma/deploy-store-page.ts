import axios from 'axios';
import toast from 'react-hot-toast';

const deployHook = process.env.NEXT_PUBLIC_STORE_DEPLOY_HOOK;

export const deployStorePage = async (storeId: string) => {
  try {
    if (!deployHook) {
      return 'Deploy hook undefined';
    }

    await axios.post(deployHook, null, {
      params: {
        storeId: storeId,
      }
    });

    toast.success(`Start deploying ${storeId}`);
  } catch(error) {
    toast.error(`Failed to deploy ${storeId}`);
    console.error('Deployment error', error);
  }
}