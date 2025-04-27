export const ContactFormEmailTemplate = ({
	fullname,
	email,
	message,
}: {
	fullname: string;
	email: string;
	message: string;
}) => {
	return (
		<html lang="en">
			<body>
				<h1>New Form Submission</h1>
				<p>You just submitted a form. Here are the details:</p>
				<p>Name: {fullname}</p>
				<p>Email: {email}</p>
				<p>Message: {message}</p>
			</body>
		</html>
	);
};
export default ContactFormEmailTemplate;
