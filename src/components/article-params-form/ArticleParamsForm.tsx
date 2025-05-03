import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

import clsx from 'clsx';
import { useState } from 'react';

import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { OnClick } from 'src/ui/arrow-button/ArrowButton';

import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';

import { IAllOptions } from 'src/index';

export type ChangeSelectFn = (selection: OptionType) => void;

interface PropsArticleParamsForm {
	onClick: OnClick;
	isOpen: boolean;
	setPageState: React.Dispatch<React.SetStateAction<IAllOptions>>;
}


export const ArticleParamsForm = ({
	onClick,
	isOpen,
	setPageState,
}: PropsArticleParamsForm) => {
	const [formState, setFormState] = useState<IAllOptions>(defaultArticleState);

	function setDefaultOptions() {
		setFormState(defaultArticleState);
		setPageState(defaultArticleState);
	}

	function submitForm(evt: React.SyntheticEvent) {
		evt.preventDefault();
		setPageState(formState);
	}

	return (
		<>
			<ArrowButton onClick={onClick} isOpen={isOpen} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={submitForm}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected) =>
							setFormState((oldState) => ({
								...oldState,
								fontFamilyOption: selected,
							}))
						}
					/>
					<RadioGroup
						title='размер шрифта'
						name='font-size'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selected) =>
							setFormState((oldState) => ({
								...oldState,
								fontSizeOption: selected,
							}))
						}
					/>
					<Select
						title='цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selected) =>
							setFormState((oldState) => ({ ...oldState, fontColor: selected }))
						}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selected) =>
							setFormState((oldState) => ({
								...oldState,
								backgroundColor: selected,
							}))
						}
					/>
					<Select
						title='ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(selected) =>
							setFormState((oldState) => ({
								...oldState,
								contentWidth: selected,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={setDefaultOptions}/>
						<Button title='Применить' type='apply'/>
					</div>
				</form>
			</aside>
		</>
	);
};
