import Select from 'react-select';
import DivRow from './DivRow';

const ReactSelect = ( {
	// DivRow props.
	label,
	description,
	tooltip,
	className,
	keyValue,
	required,
	dependency,
	name,

	wrapper = true, // Whether to wrap in DivRow.
	options,
	defaultValue,
	updateField,
	...rest
} ) => {
	if ( !Array.isArray( options ) ) {
		options = objectToArray( options );
	}

	let newValue = defaultValue;
	if ( defaultValue ) {
		if ( !Array.isArray( newValue ) ) {
			newValue = [ newValue ];
		}
		newValue = newValue.map( value => options.find( item => item.value === value ) );
	}

	const handleChange = items => updateField( name, items ? items.map( item => item.value ) : [] );

	const select = <Select
		className="react-select"
		classNamePrefix="react-select"
		isMulti
		options={ options }
		defaultValue={ newValue }
		onChange={ handleChange }
		{ ...rest }
	/>;

	return ! wrapper
		? select
		: <DivRow
			label={ label }
			description={ description }
			tooltip={ tooltip }
			className={ className }
			keyValue={ keyValue }
			required={ required }
			dependency={ dependency }
		>
			{ select }
		</DivRow>;
};

const objectToArray = object => Object.entries( object ).map( ( [ value, label ] ) => ( { value, label } ) );

export default ReactSelect;