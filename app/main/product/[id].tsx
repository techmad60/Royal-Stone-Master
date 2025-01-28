"use client";
import { useSearchParams } from "next/navigation";

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Retrieve the "id" from search params

  return <div>Product Details Page for ID: {id}</div>;
};

export default ProductDetails;
 {/* <section>
                <p className="text-color-form text-sm">Today</p>
                <hr className="my-3" />
                <section className="flex justify-between items-center bg-light-grey p-4 shadow-sm rounded-common mt-2 lg:w-[361px] xl:w-[520px]">
                  <div className="flex gap-4 lg:gap-3">
                    <Icon
                      icon={<GoPlus className="text-color-one text-lg" />}
                      containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
                    />
                    <div>
                      <p className="text-sm text-color-zero font-medium">
                        Wallet Funding
                      </p>
                      <p className="text-xs text-color-one">Completed</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-color-six">$20</p>
                    <p className="text-slate-400 text-xs">11:04 AM</p>
                  </div>
                </section>
              </section>
              <section className="my-5">
                <p className="text-color-form text-sm">September 11th, 2024</p>
                <hr className="my-3" />
                <section className="flex justify-between items-center bg-light-grey p-4 shadow-sm rounded-common lg:w-[361px] xl:w-[520px]">
                  <div className="flex gap-4 lg:gap-3">
                    <Icon
                      icon={
                        <BsFileBarGraphFill className="text-color-one text-lg" />
                      }
                      containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
                    />
                    <div>
                      <p className="text-sm text-color-zero font-medium">
                        Investment Purchase
                      </p>
                      <p className="text-xs text-color-one">Successful</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-color-six">$20</p>
                    <p className="text-slate-400 text-xs">11:04 AM</p>
                  </div>
                </section>
              </section> */}
                // Construct transaction data based on the MakeInvestmentBankResponse structure
    // const transactionDataBank: MakeInvestmentBankResponse["data"] = {
    //   investment: {
    //     accountID: params.get("accountID") || "",
    //     amount: params.get("amount") || "",
    //     type: params.get("type") || "",
    //     status: params.get("status") || "",
    //     beneficiary: params.get("beneficiary") || "",
    //     investmentPurchaseID: params.get("investmentPurchaseID") || "",
    //     paymentMade: params.get("paymentMade") === "true", // Convert to boolean
    //     createdAt: params.get("createdAt") || "",
    //     updatedAt: params.get("updatedAt") || "",
    //     id: params.get("id") || "",
    //   },
    //   beneficiary: {
    //     type: params.get("beneficiaryType") || "",
    //     status: params.get("beneficiaryStatus") || "",
    //     bankName: params.get("bankName") || "",
    //     accountName: params.get("accountName") || "",
    //     accountNumber: params.get("accountNumber") || "",
    //     bankAddress: params.get("bankAddress") || "",
    //     swiftCode: params.get("swiftCode") || "",
    //     routingNumber: params.get("routingNumber") || "",
    //     beneficiaryAddress: params.get("beneficiaryAddress") || "",
    //     createdAt: params.get("beneficiaryCreatedAt") || "",
    //     updatedAt: params.get("beneficiaryUpdatedAt") || "",
    //     id: params.get("beneficiaryID") || "",
    //   },
    // };
    // {
    //   "admin": {
    //     "firstname": "Sub",
    //     "lastname": "Admin",
    //     "email": "whatis@mail.com",
    //     "phone": "09090909090",
    //     "status": "active",
    //     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7nG8OgXmMOXXiwbNOc-PPXUcilcIhCkS9BQ&usqp=CAU",
    //     "role": "673cf4f45fa9ddc57be699f2",
    //     "twoFactorAuthentication": false,
    //     "createdAt": "2024-11-19T20:32:01.441Z",
    //     "updatedAt": "2024-11-19T20:32:01.441Z",
    //     "id": "673cf5c15fa9ddc57be699fa"
    //   },
    //   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoiNjczY2Y1YzE1ZmE5ZGRjNTdiZTY5OWZhIiwiaWF0IjoxNzMyMDQ4NDgyLCJleHAiOjE3MzIxMzQ4ODJ9.nFhWM-Kj6psy_h6xPLOXNMQVBaSYrYZGKesj1O-_J8c",
    //   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoiNjczY2Y1YzE1ZmE5ZGRjNTdiZTY5OWZhIiwiaWF0IjoxNzMyMDQ4NDgyLCJleHAiOjE3MzIwNTEwNzR9.uyfuEIHTNhfjtaMu8zR7TO5Xg_UPAEwJYnUQ2CvahcE"
    // }"accountID": "67879abb6bd5ac1493145737",
  //   {
  //     "accountID": "67879abb6bd5ac1493145737",
  //     "amount": 100000,
  //     "type": "savings-wallet-funding",
  //     "status": "pending",
  //     "beneficiary": "676889c88860831a53be6700",
  //     "paymentMade": true,
  //     "createdAt": "2025-01-27T08:31:55.901Z",
  //     "updatedAt": "2025-01-27T08:33:04.652Z",
  //     "proofOfPayment": "https://ik.imagekit.io/dvihd4xty/code_3e02aMYcD.png",
  //     "id": "6797447bf8c010ab295577aa"
  // },