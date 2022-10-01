import {useState} from 'react';

export default function ContactForm() {
	const [inputs, setInputs] = useState({});

	function handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({...values, [name]: value}));
	}

	function handleSubmit(event) {
		event.preventDefault();
		console.log('This is your inputs obj...', inputs);
	}

	return (
		<div className="item one">
			<h1>Kontaktujte nás</h1>
			<p></p>
			<h3>Pomocí formuláře se na nás můžete obrátit s Vaším dotazem</h3>
			{/*Form section*/}
			<p></p>
			<form className="form-section" onSubmit={handleSubmit}>
				<tcol>
					<tr>
						<label htmlFor="sender-name">
							Jméno a příjmení <sup>*</sup> :
						</label>
						<input
							type="text"
							name="name"
							id="sender-name"
							placeholder="Jméno a příjmení "
							value={inputs.name}
							onChange={handleChange}
						/>
					</tr>
					{/*next row*/}
					<tr>
						<label htmlFor="sender-street">Ulice:</label>
						<input
							type="text"
							name="street"
							id="sender-street"
							placeholder="Ulice"
							value={inputs.street}
							onChange={handleChange}
						/>
					</tr>
					{/*next row*/}
					<tr>
						<label htmlFor="sender-place">Obec/Město:</label>
						<input
							type="text"
							name="municipality"
							id="sender-place"
							placeholder="Obec nebo Město"
							value={inputs.municipality}
							onChange={handleChange}
						/>
					</tr>
					{/*next row*/}
					<tr>
						<label htmlFor="sender-postal-code">PSČ:</label>
						<input
							type="number"
							name="postal"
							id="sender-postal-code"
							placeholder="Poštovní směrovací číslo"
							value={inputs.postal}
							onChange={handleChange}
						/>
					</tr>
					{/*next row*/}
					<tr>
						<label htmlFor="sender-phone">
							Telefon <sup>*</sup> :
						</label>
						<input
							type="number"
							name="phone"
							id="sender-phone"
							placeholder="Telefonní kontakt"
							value={inputs.phone}
							onChange={handleChange}
						/>
					</tr>
					{/*next row*/}
					<tr>
						<label htmlFor="sender-email">
							Email <sup>*</sup> :
						</label>
						<input
							type="email"
							id="sender-email"
							name="email"
							placeholder="Váš email@email.cz"
							value={inputs.email}
							onChange={handleChange}
						/>
					</tr>

					{/*next row*/}
					<tr>
						<label htmlFor="sender-subject">
							Předmět <sup>*</sup> :
						</label>
						<input
							type="subject"
							name="subject"
							id="sender-subject"
							placeholder="Čeho se daná věc týká"
							value={inputs.subject}
							onChange={handleChange}
						/>
					</tr>
				</tcol>

				{/*next row*/}
				<tr>
					<label htmlFor="sender-message">
						Obsah <sup>*</sup> :
					</label>
					<textarea
						rows="10"
						cols="100"
						type="content"
						name="content"
						id="sender-message"
						placeholder="Obsah Vašeho sdělení"
						value={inputs.content}
						onChange={handleChange}
					/>
				</tr>
				{/*Button section*/}
				<div className="form-footer">
					<div className="validation-message">validation</div>
					<button type="submit" className="btn btn-primary">
						Odeslat
					</button>
				</div>
			</form>
		</div>
	);
}
