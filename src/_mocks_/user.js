import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: sample([
    'UI/UX Designer',
    'Backend Developer',
    'Software Engineer',
    'Front End Developer',
    'Full Stack Developer'
  ]),
  company: faker.company.companyName(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample(['Internship', 'Graduate']),
}));

export default users;
