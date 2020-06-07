/** View files paths */
import path from 'path';

/** Resolves absolute path of a view to `public/views` directory
 * @param viewName Name of view to resolve path for
 */
const resolveViews = (viewName: string) => {
    return path.resolve('public/views/' + viewName);
};

/** Resolves absolute path of a style file to `public/views/styles` directory
 * @param styleName Name of style file to resolve path for
 */
const resolveStyles = (styleName: string) => {
    return path.resolve('public/views/assets/styles/' + styleName);
};

/** Absolute paths of views present in `public/views` directory */
const views = {
    INDEX: resolveViews('index.html'),
    LIST: resolveViews('list.html'),
};

/** Absolute paths of style files present in `public/views/styles` directory */
const styles = {
    INDEX: resolveStyles('index.css'),
    LIST: resolveStyles('list.css'),
};

// Exports ------------------------------------------------------------------------------------------------------------------------
export default views;
export { styles, resolveViews, resolveStyles };