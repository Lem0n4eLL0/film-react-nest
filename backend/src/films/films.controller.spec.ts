import { Test, TestingModule } from '@nestjs/testing';
import FilmsController from './films.controller';
import FilmsService from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: FilmsService;

  const mockFilmsService = {
    getAllFilms: jest.fn(),
    getFilmSchedule: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('findAll', () => {
    const mockFilms = [
      { id: '1', title: 'Inception' },
      { id: '2', title: 'Interstellar' },
    ];
    mockFilmsService.getAllFilms.mockReturnValue(mockFilms);

    const result = controller.findAll();

    expect(filmsService.getAllFilms).toHaveBeenCalledTimes(1);
    expect(result).toBe(mockFilms);
  });

  it('findById', () => {
    const mockSchedule = { id: '1', title: 'Inception' };
    const id = '1';

    mockFilmsService.getFilmSchedule.mockReturnValue(mockSchedule);

    const result = controller.findById(id);

    expect(filmsService.getFilmSchedule).toHaveBeenCalledTimes(1);
    expect(filmsService.getFilmSchedule).toHaveBeenCalledWith(id);
    expect(result).toBe(mockSchedule);
  });
});
