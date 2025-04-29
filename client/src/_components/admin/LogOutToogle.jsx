import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";



const LogOutToogle = () => {
  return (
      <div>
          <DropdownMenu>
              <DropdownMenuTrigger>
                  <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  
              </DropdownMenuContent>
          </DropdownMenu>
      </div>
  );
}

export default LogOutToogle