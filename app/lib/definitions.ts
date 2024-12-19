export interface Source {
	initials?: string;
	name?: string;
	sigla?: string;
	nome?: string;
};

export interface Damage {
	dice: string;
	type: string;
};

export interface WeaponProperty {
	name: string;
	description: string;
};

export interface Item {
	id: number;
	name: string;
	url: string;
	value: number;
};

export type MagicItem = Item & {
	attunement?: string;
	description: string;
	rarity: string;
	reforge?: {
		type: string,
		text: string,
	};
	source: Source;
};

export type ConsumableItem = Item & {
	description: string;
	rarity: string;
	source: Source;
};

export type ArtificerInfusion = Item & {
	attunement?: string;
	description: string;
	level: number;
	source: Source;
};

export type MundaneItem = Item & {
	weight: string;
	type: string[];
	damage?: Damage;
	properties?: WeaponProperty[];
	ac?: string;
	stealth?: string;
	strength?: string;
};

export interface InputClasses {
	name: string;
	value: string;
}

export interface SpellSlot {
	level: string;
	quantity: number;
}