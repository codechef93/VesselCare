import { useMsal, useAccount } from "@azure/msal-react";

export const getMSALtoken = () => {
const { instance, accounts, inProgress } = useMsal();
const account = useAccount(accounts[0] || {});
if (account) {
    instance.acquireTokenSilent({
        scopes: ["User.Read"],
        account: account
    }).then((response) => {
        if(response) {
            return response.idToken;
        }
    });
}
else{
    return null;
}
}