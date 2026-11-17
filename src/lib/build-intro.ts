export function introScrollDistance(width: number, height: number) {
  return height * (width < 768 ? 1.5 : 2.5);
}