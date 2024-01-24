type SpansProps = {
  value       : string;
};

const Spans = (props: SpansProps) => {
  const charArray = props.value.split('');
  return (
    <>
      {charArray.map((char, index) => {
        return (
          <span key={index}>{char}</span>
        )
      })}
    </>
	);
}

export { Spans };