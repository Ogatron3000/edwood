export default function pathToDisplayName(path) {
    return path.slice(1).split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}
