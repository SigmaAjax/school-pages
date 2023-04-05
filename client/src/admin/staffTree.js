export const staffTree = {
	label: 'Root',
	children: [
		{
			label: 'vedení',
			children: [
				{label: 'ředitel'},
				{label: 'zástupce_ředitele'},
				{label: 'gdpr'},
			],
		},
		{
			label: 'sbor',
			children: [
				{
					label: 'učitel',
					children: [
						{label: 'vychovatelka'},
						{label: 'učitelka_v_mateřské_školce'},
					],
				},
				{
					label: 'třídní_učitel',
				},
				{
					label: 'asistenti',
					children: [
						{
							label: 'provozní_zaměstanci',
							children: [{label: 'školník'}, {label: 'účetní'}],
						},
						{
							label: 'školní_poradenské_pracoviště',
							children: [
								{label: 'školní_logoped'},
								{label: 'specialní_výchovný_poradce'},
								{label: 'metodik_prevence'},
							],
						},
					],
				},
			],
		},
	],
};
