# front-end


## License
This project is based on MIT license.

## Thanks
This project is reusing components, concepts and ideas from the folloing open source project:

- HTML5 Boilerplate: https://html5boilerplate.com/

## project structure

- **dist:** Contains all the build code. Only this folder should be deployed on the server. The folder content don't have to be stored on GiT and can be deleted (fully recreate from the src folder content).
- **src:** Contains all sources build in the project, but not the 3rd party codes.
    - **fonts:** All the custom font files used in this project
    - **html:** files used by nunjucks templating system. this is HTML but with specific tags to create modular code.
    - **img:** Images used by the project, except images used in CSS.
    - **js:** all the javascript files.
    - **sass:** Sass preprocessor files. see SASS Structure section for more details.
        + i: contains images used in CSS like SVG icons, sprites, etc..
- **.gitignore:** List all the files and folder that should not be stored in the GIT repository. It can  be removed if you don't plan to use GiT to store the code.
- **gulpfile.js:** configuration file for the Gulp builder. you will use it to generate the final code from the source.
- **package.json:** Used by nmp to get all the dependencies and define the project.



## SASS Structure

### ITCSS
This project is trying to reuse the structure suggessted in the ITCSS model.**Add link to ITCSS**

- **setting.colors**: All colors
- **setting.fonts**: All font definitions
- **tools.mixin**: All SaSS mixin
- **generic.normalize**: The normalize project **Add links**
- **elements.all**: All basic elements (links headers, etc..). This file could be slit in the future if too much styles
- **objects.all**: Objects like media OOCSS object.
- **components.page-layout-default**: The classe used to define the default page layout. It use BEM convention to define the structure (See BEM section for more details)
- **components.page-layout-homepage**: Specific strucutre used by the homepage. It use BEM convention to define the structure (See BEM section for more details)
- **components.xxx**: contains classes that deifine the specific components strcuture and behaviour. Different behaviour => different component. It use BEM convention to define the structure (See BEM section for more details)
- **component.xxx--theme-name**: When a component has to be customized (colors, size, etc..)
- **trumps.all**: Really secific code like clearfix, hacks, ie8, etc.. could be split in the future.

### BEM
BEM Notation is used for all the components ** Add link to BEM**

- **.block:** the component name
- **.block__element:** an component element
- **.block--modifier:** used to customize the component

### Namespace & SMACSS

Some element comes from the Namespace concept and SMACSS methodology **Add links to both websites**

- **o-**: Used for objects
- **c-**: Used by components
- **u-**: utilities classes
- **t-**: used by theme classes (mostly modifiers in BEM)
- **s-**: scope
- **_**: For hacks
- **js-**: When class should be applied if Javascript is enable only.
- 


## Browserify

Browser support from: 
- Internet Explorer 7
- Firefox 10.0
- Chrome 14.0
- Safari 5.05
- Opera 10.6
- Android browser 4.2
- Safari on iPhone/iPad 6.0


## Components

### Tabs
Tab component is based on the inclusive component design: https://inclusive-components.design/tabbed-interfaces/

