import React from 'react';

type Props = {
	message: string,
}


const ErrorMessage = ({message}: Props) => {
	return (
		<p className='text-sm text-destructive' role='alert'>
			{message}
		</p>
	);
};

export default ErrorMessage;