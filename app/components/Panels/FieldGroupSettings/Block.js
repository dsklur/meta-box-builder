import { RadioControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import Color from '../../../controls/Color';
import DashiconPicker from '../../../controls/DashiconPicker';
import Input from '../../../controls/Input';
import ReactSelect from '../../../controls/ReactSelect';
import Select from '../../../controls/Select';
import Textarea from '../../../controls/Textarea';
import useSettings from "../../../hooks/useSettings";
import { ensureArray } from '../../../functions';

const Block = () => {
	const { getSetting, updateSetting } = useSettings();
	const iconType = getSetting( 'icon_type', 'dashicons' );

	return <>
		<Input
			name="description"
			label={ __( 'Description', 'meta-box-builder' ) }
			componentId="settings-block-description"
			defaultValue={ getSetting( 'description', '' ) }
			updateField={ updateSetting }
		/>
		<Select
			name="icon_type"
			label={ __( 'Icon type', 'meta-box-builder' ) }
			componentId="settings-block-icon_type"
			options={ { dashicons: __( 'Dashicons', 'meta-box-builder' ), svg: __( 'Custom SVG', 'meta-box-builder' ) } }
			defaultValue={ iconType }
			updateField={ updateSetting }
		/>
		{
			iconType === 'svg' &&
			<Textarea
				name="icon_svg"
				label={ __( 'SVG icon', 'meta-box-builder' ) }
				componentId="settings-block-icon_svg"
				placeholder={ __( 'Paste the SVG content here', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'icon_svg', '' ) }
				updateField={ updateSetting }
			/>
		}
		{
			iconType === 'dashicons' &&
			<DashiconPicker
				label={ __( 'Icon', 'meta-box-builder' ) }
				name="icon"
				defaultValue={ getSetting( 'icon' ) }
				updateField={ updateSetting }
			/>
		}
		{
			iconType === 'dashicons' &&
			<>
				<Color
					name="icon_foreground"
					label={ __( 'Icon color', 'meta-box-builder' ) }
					defaultValue={ getSetting( 'icon_foreground', '' ) }
					updateField={ updateSetting }
					tooltip={ __( 'Leave empty to use default color', 'meta-box-builder' ) }
				/>
				<Color
					name="icon_background"
					label={ __( 'Icon background color', 'meta-box-builder' ) }
					defaultValue={ getSetting( 'icon_background', '' ) }
					updateField={ updateSetting }
					tooltip={ __( 'Leave empty to use default color', 'meta-box-builder' ) }
				/>
			</>
		}
		<Select
			name="category"
			label={ __( 'Category', 'meta-box-builder' ) }
			componentId="settings-block-category"
			options={ MbbApp.blockCategories }
			defaultValue={ getSetting( 'category', '' ) }
			updateField={ updateSetting }
		/>
		<Input
			name="keywords"
			label={ __( 'Keywords', 'meta-box-builder' ) }
			componentId="settings-block-keywords"
			tooltip={ __( 'Separate by commas', 'meta-box-builder' ) }
			defaultValue={ getSetting( 'keywords', '' ) }
			updateField={ updateSetting }
		/>
		<RadioControl
			className="og-field"
			label={ __( 'Block settings position', 'meta-box-builder' ) }
			options={ [
				{
					label: __( 'In the content area', 'meta-box-builder' ),
					value: 'normal',
				},
				{
					label: __( 'On the right sidebar', 'meta-box-builder' ),
					value: 'side',
				},
			] }
			selected={ getSetting( 'block_context', 'side' ) }
			onChange={ value => updateSetting( 'block_context', value ) }
		/>
		<ReactSelect
			name="supports.align"
			label={ __( 'Alignment', 'meta-box-builder' ) }
			componentId="settings-block-supports-align"
			options={ {
				left: __( 'Left', 'meta-box-builder' ),
				right: __( 'Right', 'meta-box-builder' ),
				center: __( 'Center', 'meta-box-builder' ),
				wide: __( 'Wide', 'meta-box-builder' ),
				full: __( 'Full', 'meta-box-builder' ),
			} }
			defaultValue={ ensureArray( getSetting( 'supports.align', [] ) ) }
			updateField={ updateSetting }
		/>

		<ToggleControl
			label={ __( 'Custom CSS class name', 'meta-box-builder' ) }
			checked={ !!getSetting( 'supports.customClassName' ) }
			onChange={ value => updateSetting( 'supports.customClassName', value ) }
		/>
	</>;
};

export default Block;