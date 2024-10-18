import { useState } from 'react';
import styles from './app.module.css';
import data from './data/data.json';

export const App = () => {
	const [steps, setSteps] = useState([...data]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isFirstStep, setIsFirstStep] = useState(true);
	const [isLastStep, setIsLastStep] = useState(false);

	const stepForward = () => {
		setActiveIndex(activeIndex + 1);
		activeIndex > 0 ? setIsFirstStep(false) : setIsFirstStep(true);
	};

	const stepBack = () => {
		setActiveIndex(activeIndex - 1);
		activeIndex === 6 ? setIsLastStep(true) : setIsLastStep(false);
	};

	const startAgain = () => {
		setActiveIndex(0);
		setIsLastStep(false);
		setIsFirstStep(true);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((item, index) => (
							<li
								className={
									styles['steps-item'] +
									' ' +
									(index < activeIndex
										? styles.done
										: index === activeIndex
										? styles.active + ' ' + styles.done
										: '')
								}
								key={item.id}
							>
								<button className={styles['steps-item-button']}>
									{index + 1}
								</button>
								{item.title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={stepBack}
							disabled={activeIndex === 0 ? true : false}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={activeIndex === 6 ? startAgain : stepForward}
						>
							{activeIndex === 6 ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
