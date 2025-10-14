// "use client";

// import Link from "next/link";
// import { ChevronRight } from "lucide-react";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   SidebarGroup,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar";

// export function NavMain({
//   items,
// }: {
//   items: Array<{
//     title: string;
//     url: string;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     icon: any;
//     isActive?: boolean;
//     items?: Array<{ title: string; url: string; isActive?: boolean }>;
//   }>;
// }) {
//   return (
//     <SidebarGroup>
//       <SidebarMenu>
//         {items.map((item) => {
//           const hasChildren = !!item.items?.length;

//           // Case 1: simple link (no children) — make it clickable
//           if (!hasChildren) {
//             return (
//               <SidebarMenuItem key={item.title}>
//                 <SidebarMenuButton asChild tooltip={item.title}>
//                   <Link href={item.url}>
//                     {item.icon && <item.icon />}
//                     <span>{item.title}</span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             );
//           }

//           // Case 2: collapsible with children
//           return (
//             <Collapsible
//               key={item.title}
//               asChild
//               defaultOpen={item.isActive}
//               className="group/collapsible"
//             >
//               <SidebarMenuItem>
//                 <CollapsibleTrigger asChild>
//                   <SidebarMenuButton tooltip={item.title}>
//                     {item.icon && <item.icon />}
//                     <span>{item.title}</span>
//                     <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                   </SidebarMenuButton>
//                 </CollapsibleTrigger>

//                 <CollapsibleContent>
//                   <SidebarMenuSub>
//                     {item.items!.map((sub) => (
//                       <SidebarMenuSubItem key={sub.title}>
//                         <SidebarMenuSubButton asChild isActive={sub.isActive}>
//                           <Link href={sub.url}>
//                             <span>{sub.title}</span>
//                           </Link>
//                         </SidebarMenuSubButton>
//                       </SidebarMenuSubItem>
//                     ))}
//                   </SidebarMenuSub>
//                 </CollapsibleContent>
//               </SidebarMenuItem>
//             </Collapsible>
//           );
//         })}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }












/**************************************************************************************** */

"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: Array<{
    title: string;
    url: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    isActive?: boolean;
    roles?: string[];
    items?: Array<{ 
      title: string; 
      url: string; 
      isActive?: boolean;
      roles?: string[];
    }>;
  }>;
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = !!item.items?.length;

          // Case 1: simple link (no children) — make it clickable
          if (!hasChildren) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          // Case 2: collapsible with children
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items!.map((sub) => (
                      <SidebarMenuSubItem key={sub.title}>
                        <SidebarMenuSubButton asChild isActive={sub.isActive}>
                          <Link href={sub.url}>
                            <span>{sub.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
