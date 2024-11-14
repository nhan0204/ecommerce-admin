import toast from "react-hot-toast";

const deployUrl = process.env.NEXT_PUBLIC_STORE_DEPLOY_HOOK;

export const deployStorePage = async (storeId: string) => {
  try {
    if (!deployUrl) {
      return "Deploy hook undefined";
    }

    console.log('Deploy hook: ',deployUrl);

    const res = await fetch(deployUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ storeId }),
    });

    if (res.status === 404) {
      toast.error(`Failed to deploy ${storeId}`);
    }

    toast.success(`Start deploying ${storeId}`);
    return res;
  } catch (error) {
    toast.error(`Failed to deploy ${storeId}`);
    console.error("Deployment error", error);
  }
};
