type Options<T> = {
    actionFn: () => Promise<T>;
    successMessage?: string;
}


const executeAction = async <T>({ actionFn, successMessage }: Options<T>): Promise<{
    success: boolean; message?: string; data?: T;
}> => {
   try{
    const result = await actionFn();

    return {
        success: true,
        message: successMessage || "Action executed successfully.",
        data: result
    };
   } catch (error) {
       return { success: false, message: `Error: ${error instanceof Error ? error.message : 'an error occurred while executing the action.'}` };
   }
}
