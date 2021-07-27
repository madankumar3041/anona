import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFaqList } from '../../store/home/homeAction';

export default function Faq() {
	const dispatch = useDispatch();

	const [selectedFaqs, setSelectedFaqs] = useState('');

	const faqslist = useSelector((state) => state.home.faqslist);
	console.log(faqslist);

	useEffect(() => {
		const formData = new FormData();
		formData.append('language_id', 1);

		dispatch(getFaqList(formData));
	}, [dispatch]);

	const onSelectFaqs = (id) => {
		console.log(id);
		setSelectedFaqs(id);
	};
	return (
		<div>
			<section class="section-main innerpages">
				<div class="container-fluid">
					<div class="row">
						<div class="col-12 text-center">
							<h1>FAQs</h1>
						</div>
					</div>
					<div class="row">
						{faqslist &&
							faqslist.map((faq) => (
								<div class="col-lg-6 col-md-6 col-sm-6 left-faq">
									<a onClick={() => onSelectFaqs(faq.main_faq_master_id)} class="faq-link">
										{faq.faq_question}
									</a>
									{selectedFaqs === faq.main_faq_master_id ? (
										<div class="faq-contents d-block">
											<p>{faq.faq_answer}</p>
										</div>
									) : (
										<div class="faq-contents">
											<p>{faq.faq_answer}</p>
										</div>
									)}
								</div>
							))}
					</div>
				</div>
			</section>
		</div>
	);
}
