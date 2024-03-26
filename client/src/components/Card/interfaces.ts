export interface CardProps {
	id?: string;
	title?: string;
	description?: string;
	type?: 'todo' | 'inProgress' | 'done';
}
