/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* eslint-disable no-console */
(() => {
  // remove global "Important Safety Information" components
  document.querySelectorAll('.isi-container').forEach((el) => el.remove());

  // remove cookie consent components
  let el;
  /* eslint-disable no-cond-assign */
  while (el = document.querySelector('[class*="ot-sdk"], [class*="truste_"]')) {
    el.remove();
  }

  // remove AWS CCC sidebar
  const awscccSidebar = document.querySelector('#awsccc-sb-ux-c');
  if (awscccSidebar) {
    awscccSidebar.remove();
  }
})();