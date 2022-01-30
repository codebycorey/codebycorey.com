import { CSSProperties } from 'react';

export interface CompositionStyles extends CSSProperties {
  '--content-min'?: CSSProperties['minWidth'];

  '--color-dark'?: CSSProperties['color'];
  '--color-darkish'?: CSSProperties['color'];
  '--color-lightish'?: CSSProperties['color'];
  '--color-light'?: CSSProperties['color'];
  '--color-mid'?: CSSProperties['color'];
  '--ratio'?: string;
  '--s-5'?: CSSProperties['fontSize'];
  '--s-4'?: CSSProperties['fontSize'];
  '--s-3'?: CSSProperties['fontSize'];
  '--s-2'?: CSSProperties['fontSize'];
  '--s-1'?: CSSProperties['fontSize'];
  '--s0'?: CSSProperties['fontSize'];
  '--s1'?: CSSProperties['fontSize'];
  '--s2'?: CSSProperties['fontSize'];
  '--s3'?: CSSProperties['fontSize'];
  '--s4'?: CSSProperties['fontSize'];
  '--s5'?: CSSProperties['fontSize'];
  '--measure'?: CSSProperties['width'];
  '--line-height'?: CSSProperties['lineHeight'];
  '--line-height-small'?: CSSProperties['lineHeight'];
  '--border-thin'?: CSSProperties['borderWidth'];
  '--border-thick'?: CSSProperties['borderWidth'];
  '--space'?: CSSProperties['height'];
  '--cover-padding'?: CSSProperties['padding'];
  '--gap'?: CSSProperties['gap'];
}
