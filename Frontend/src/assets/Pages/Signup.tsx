import { Auth } from "../../Components/Auth";
import { Quote } from "../../Components/Quote";

export function Signup() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 ">
            <Auth type="signup">
                
            </Auth>
            <Quote>

            </Quote>
            
        </div>
    )
}