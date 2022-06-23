function renderTableOfContents (data) {
  let contentsArr = Object.keys(data).filter(section => !section.startsWith('confirmAbout'));
  contentsArr = contentsArr.slice(1, contentsArr.length-2);
  const content = contentsArr.map(section => {
    return `[${section.toUpperCase()}](#${section})<br>`
  })
  return `  
  ++++++++++++++++++   
  ## TABLE OF CONTENTS   
  ++++++++++++++++++<br>
  ${content.join("")}
  [QUESTIONS](#QUESTIONS)
  `;
};

function renderOtherSections(othersArr, name) {
  if (!othersArr[name]) {
    return '';
  } else {
    return `## ${name.toUpperCase()}
    ${othersArr[name]}
    `;
  };
};

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (!license) {
    return '';
  } else {
    switch (license) {
      case 'Apache 2.0':
        return `![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)`;
      case 'BSD 3':
        return `![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)`;
      case 'GPL':
        return `![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)`;
      case 'LGPL':
        return `![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)`;
      case 'MIT':
        return '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)';
      case 'Mozilla Public License 2.0':
        return '![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)';
    };
  };
};

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (!license) {
    return '';
  } else {
    switch (license) {
      case 'Apache 2.0':
        return `[Click Here to View the License Statement](https://opensource.org/licenses/Apache-2.0)<br>`;
      case 'BSD 3':
        return `[Click Here to View the License Statement](https://opensource.org/licenses/BSD-3-Clause)<br>`;
      case 'GPL':
        return `[Click Here to View the License Statement](https://www.gnu.org/licenses/gpl-3.0.en.html)<br>`;
      case 'LGPL':
        return `[Click Here to View the License Statement](https://www.gnu.org/licenses/lgpl-3.0.en.html)<br>`;
      case 'MIT':
        return '[Click Here to View the License Statement](https://opensource.org/licenses/MIT)<br>';
      case 'Mozilla Public License 2.0':
        return '[Click Here to View the License Statement](https://opensource.org/licenses/MPL-2.0)<br>';
    };
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (!license) {
    return '';
  } else {
    return `## LICENSE`;
  };
};


// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const { title, description, license, github, email, ...others} = data;
  return `# ${title}
  ${renderLicenseBadge(license)}
  ${renderTableOfContents(data)}
  ## DESCRIPTION
  ${data.description}
  ${renderOtherSections(others,'installation')}
  ${renderOtherSections(others,'usage')}
  ${renderOtherSections(others,'contribution')}
  ${renderOtherSections(others,'test')}
  ${renderLicenseSection(license)}
  ${renderLicenseLink(license)}
  ## QUESTIONS
  For more projects, please refer to [my GitHub](https://github.com/${github}).   
  For questions, please check usage documentation for reference.   
  If the question is still unsolved, please send it to *${email}* and I will get back to you ASAP.
`;
}

module.exports = generateMarkdown;
