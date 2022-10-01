export const staffTree = [
	{
		sbor: [
			{
				učitel: ['vychovatelka', 'učitelka_v_mateřské_školce'],
			},
			{
				třídní_učitel: 'lidé',
			},
			{
				asistenti: [
					{
						provozní_zaměstanci: ['školník', 'účetní'],
					},
					{
						školní_poradenské_pracoviště: [
							'školní_logoped',
							'specialní_výchovný_poradce',
							'metodik_prevence',
						],
					},
				],
			},
		],
	},
	{vedení: ['ředitel', 'zástupce_ředitele', 'gdpr']},
];
