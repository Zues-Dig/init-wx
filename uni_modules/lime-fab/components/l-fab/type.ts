// @ts-nocheck
export type FabMagnetic = 'x' | 'y';
export type FabOffset = {
  x: number;
  y: number;
};
export type FabAxis = 'x' | 'y' | 'xy' | 'lock';

export type FabBoundary = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

 export interface CSSProperties {
	 [key: string]: string | number
 }
 