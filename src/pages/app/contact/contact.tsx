import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Contact() {
    return (
        <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-between gap-20 sm:w-[350px]">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Fale conosco</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
  
          <div>
            <Button className="w-full">
                <Link to="">
                    Falar no whatsapp
                </Link>
            </Button>
          </div>
        </div>
      </div>
    )
}