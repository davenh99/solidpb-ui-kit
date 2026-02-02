import type { Meta, StoryObj } from "storybook-solidjs-vite";
import User from "lucide-solid/icons/user";
import Settings from "lucide-solid/icons/settings";
import LogOut from "lucide-solid/icons/log-out";
import DrawOpen from "lucide-solid/icons/panel-left-open";
import DrawClose from "lucide-solid/icons/panel-left-close";
import Activity from "lucide-solid/icons/activity";
import Ambulance from "lucide-solid/icons/ambulance";
import ThumbsDown from "lucide-solid/icons/thumbs-down";

import Navbar from "./Navbar";
import { Drawer } from "../Drawer";
import { Container } from "../Container";
import { DropdownMenu } from "../DropdownMenu";
import { Avatar } from "../Avatar";
import { Card } from "../Card";

const meta: Meta<typeof Navbar> = {
  title: "Navbar",
  component: Navbar,
};
export default meta;
type Story = StoryObj<typeof Navbar>;

const linkClass = "justify-between";

export const Basic: Story = {
  render: () => {
    return (
      <Drawer id="drawer-2">
        <Drawer.Content>
          <Navbar>
            <div class="flex items-center">
              <Drawer.Trigger class="btn btn-ghost btn-square btn-sm lg:hidden">
                <DrawOpen size="24" />
              </Drawer.Trigger>
              <Navbar.Brand>
                <a>My App</a>
              </Navbar.Brand>
              <Navbar.Menu>
                <Navbar.MenuItem>
                  <a>Configuration</a>
                </Navbar.MenuItem>
                <Navbar.MenuItem>
                  <Navbar.Submenu title="Settings">
                    <Navbar.MenuItem>
                      <a class="text-nowrap">Setting 1</a>
                    </Navbar.MenuItem>
                    <Navbar.MenuItem>
                      <a class="text-nowrap">Setting 2</a>
                    </Navbar.MenuItem>
                    <Navbar.MenuItem>
                      <a class="text-nowrap">Setting 3</a>
                    </Navbar.MenuItem>
                  </Navbar.Submenu>
                </Navbar.MenuItem>
                <Navbar.MenuItem>
                  <a>Data</a>
                </Navbar.MenuItem>
              </Navbar.Menu>
            </div>
            <Navbar.Profile>
              <DropdownMenu>
                <DropdownMenu.Trigger>
                  <Avatar fallback="DH" alt="Placeholder" size="md" class="btn btn-round" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content size="sm" class="min-w-50">
                  <DropdownMenu.MenuItem onSelect={() => {}}>
                    <a class={linkClass}>
                      <span>Profile</span> <User size="16" />
                    </a>
                  </DropdownMenu.MenuItem>
                  <DropdownMenu.MenuItem onSelect={() => {}}>
                    <a class={linkClass}>
                      <span>Settings</span> <Settings size="16" />
                    </a>
                  </DropdownMenu.MenuItem>
                  <DropdownMenu.MenuItem onSelect={() => {}}>
                    <a class={linkClass}>
                      <span>Logout</span> <LogOut size="16" />
                    </a>
                  </DropdownMenu.MenuItem>
                </DropdownMenu.Content>
              </DropdownMenu>
            </Navbar.Profile>
          </Navbar>
          <Container>
            <Card>Content</Card>
          </Container>
        </Drawer.Content>
        <Drawer.Drawer>
          <Drawer.Trigger class="btn btn-ghost btn-square btn-sm hidden lg:flex mx-2 mt-2 w-12">
            <DrawOpen size="24" class="is-drawer-open:hidden" />
            <DrawClose size="24" class="is-drawer-close:hidden" />
          </Drawer.Trigger>
          <Drawer.Menu>
            <Drawer.MenuItem icon={<Activity />} label="Item 1" />
            <Drawer.MenuItem icon={<Ambulance />} label="Item 2" />
            <Drawer.MenuItem icon={<ThumbsDown />} label="Item 3" />
          </Drawer.Menu>
        </Drawer.Drawer>
      </Drawer>
    );
  },
};
