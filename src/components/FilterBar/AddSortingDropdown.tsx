import { Popover } from "@kobalte/core/popover";
import { Component } from "solid-js";

export const AddSortingDropdown: Component = () => {
  return (
    <Popover.Portal>
      <Popover.Content class="dropdown-content rounded-box bg-base-100 shadow-md z-20 min-w-20">
        <div>For adding filters</div>
      </Popover.Content>
    </Popover.Portal>
  );
};

export default AddSortingDropdown;
