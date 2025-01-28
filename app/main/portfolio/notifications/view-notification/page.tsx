import ViewNotification from "@/components/Portolio/ui/ViewNotifications";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function ViewNotificationPage() {
    return (
        <div>
            <Suspense fallback={<div><Loading/></div>}>
                <div>
                    <ViewNotification/>
                </div>
            </Suspense>
        </div>
    )
}