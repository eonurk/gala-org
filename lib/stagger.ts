/** Sıralı beliriş gecikmesi: style={stagger(i)} */
export function stagger(index: number, step = 0.08): React.CSSProperties {
  return { ['--rd' as string]: `${(index * step).toFixed(2)}s` };
}
