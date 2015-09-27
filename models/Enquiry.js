var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	label: 'Сообщения',
	nocreate: true,
	noedit: true
});

// TODO move enquery types to config ?
Enquiry.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	enquiryType: { type: Types.Select, options: [
		{ value: 'message', label: 'Просто оставить сообщение' },
		{ value: 'question', label: 'Есть вопрос' },
		{ value: 'invitation', label: 'Пригласить на мероприятие' },
		{ value: 'other', label: 'Другое...' }
	] },
	message: { type: Types.Markdown, required: true },
	createdAt: { type: Date, default: Date.now }
});

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
