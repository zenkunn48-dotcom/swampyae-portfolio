export function introScrollDistance(width: number, height: number) {
  return height * (width < 768 ? 1 : width < 1024 ? 1.4 : 2.5);
}

export function introScrub(width: number): true | number {
  return width < 768 ? true : width < 1024 ? 0.3 : 1;
}