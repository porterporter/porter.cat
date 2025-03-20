/** @type {import('tailwindcss').Config} */
module.exports = {
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						'a.anchor': {
							textDecoration: 'none',
							fontWeight: 'inherit',
							'&:hover': {
								textDecoration: 'none',
							},
						},
					},
				},
			},
		},
	},
};
