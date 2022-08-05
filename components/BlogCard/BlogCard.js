import { Typography, Chip } from '@material-ui/core';
import moment from 'moment';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useRouter } from 'next/router';

export default function BlogCard(props) {
  const router = useRouter();
  const { title, author, created_at, id, tags } = props;
  return (
    <div className="card-section">
      <Typography variant="h4" className="title">
        {title}
      </Typography>
      <div className="chips-section">
        {tags &&
          tags.map((item, i) => (
            <div className="chip" key={i}>
              {item}
            </div>
          ))}
      </div>
      <div
        className="read-more-section"
        onClick={(e) => router.push(`/blog/${id}`)}
      >
        Read More <ArrowForwardIcon style={{ margin: '0.2rem' }} />
      </div>
      <div className="footer">
        <Typography className="text" variant="h6">
          Author - {' ' + author}
        </Typography>
        <Typography className="text" variant="h7">
          {moment(created_at).fromNow()}
        </Typography>
      </div>
    </div>
  );
}
