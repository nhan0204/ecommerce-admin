import toast from "react-hot-toast";

const deployHook = process.env.NEXT_PUBLIC_STORE_DEPLOY_HOOK;

export const deployStorePage = async (storeId: string) => {
  try {
    if (!deployHook) {
      return "Deploy hook undefined";
    }

    const res = await fetch(deployHook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ storeId }),
    });

    toast.success(`Start deploying ${storeId}`);
    return res;
  } catch (error) {
    toast.error(`Failed to deploy ${storeId}`);
    console.error("Deployment error", error);
  }
};
